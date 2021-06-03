#!/usr/bin/env ruby

# Copyright (c) 2014-present, The osquery authors
#
# This source code is licensed as defined by the LICENSE file found in the
# root directory of this source tree.
#
# SPDX-License-Identifier: (Apache-2.0 OR GPL-2.0-only)

require 'digest'
require 'json'
require 'net/http'
require 'net/https'
require 'open3'
require 'ostruct'
require 'uri'
require 'tmpdir'


BASE_URL = "https://pkg.osquery.io"

# canonicalize_arch is a simple helper, so that we can be a bit more
# consistent in how we call our arch in this script.
def canonicalize_arch(arch, arm64: "arm64",  x86: "x86_64")
  case arch
  when "aarch64", "arm64"
    arm64
  when "x86_64"
    x86
  else
    raise "Unknown arch #{arch} for platform #{platform}"
  end
end

# title_arch canonicalizes arch for display on the download cards.
def title_arch(arch)
  " (#{canonicalize_arch(arch, arm64: 'arm64')})"
end

# gen_data is responsible for the big gnarly set of if blocks that
# take the version/platform/arch and construct a downloadable file
# path. This is capturing several years of orgnic growth
def gen_data(version, platform, arch, debug: false )
  data = OpenStruct.new

  case platform
  when "darwin"
    data.title = "macOS"
    data.filename = "osquery-#{version}.pkg"

  when "windows"
    data.title = "Windows"
    data.filename = "osquery-#{version}.msi"

  when "linux"
    real_arch = canonicalize_arch(arch, arm64: "aarch64")
    data.title = "Linux#{title_arch(arch)}"
    data.filename = "osquery-#{version}_1.linux_#{real_arch}.tar.gz"

  when "deb"
    real_arch = canonicalize_arch(arch, arm64: "arm64", x86: "amd64")
    data.title = "Debian#{title_arch(arch)}"
    data.filename = if debug
                      # WHY DO WE HAVE THIS INCONSISTENCY!?
                      suffix = if real_arch == "arm64"
                                 "ddeb"
                               else
                                 "deb"
                               end
                      "osquery-dbgsym_#{version}-1.linux_#{real_arch}.#{suffix}"
                    else
                      "osquery_#{version}-1.linux_#{real_arch}.deb"
                    end

  when "rpm"
    real_arch = canonicalize_arch(arch, arm64: "aarch64")
    data.title = "RPM#{title_arch(arch)}"
    data.filename = if debug
                      "osquery-debuginfo-#{version}-1.linux.#{real_arch}.rpm"
                    else
                      "osquery-#{version}-1.linux.#{real_arch}.rpm"
                    end
  else
    raise "Unknown platform: #{platform}"
  end

  return data
end

def verify_uri(uri)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.start
  response = http.head(uri.path)
  return response.code == "200"
end

def digest_uri(uri)
  # equivlent to
  # SHA=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')
  sha256 = Digest::SHA256.new

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.start

  req = Net::HTTP::Get.new(uri)

  http.request req do |resp|
    resp.read_body do |chunk|
      sha256.update(chunk)
    end
  end

  sha256.to_s
end


def gen_download_entry(version, platform, arch, debug: false )
  data = gen_data(version, platform, arch, debug: debug)
  uri = URI.join(BASE_URL, File.join(platform, data.filename))

  puts "Starting work on #{uri}"

  unless verify_uri(uri)
    raise "URL not valid: #{uri.to_s}"
  end

  {
    type: data.title,
    package: data.filename,
    platform: platform,
    content: digest_uri(uri),
  }
end



def usage(err: nil, ec: 0)
  if err
    puts err
    puts ""
    ec = 1
  end

  puts "#{__FILE__} <version> <osquery checkout> <website checkout>"
  exit ec
end

def download_url_to_path(url, filepath)
  uri = URI.parse(url)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.start

  req = Net::HTTP::Get.new(uri)

  File.open(filepath, "w") do |f|
    http.request req do |resp|
      resp.read_body do |chunk|
        f.write(chunk)
      end
    end
  end
end

def tmp_dir_with_osquery_version(ver)
  url = "https://github.com/osquery/osquery/archive/refs/tags/#{ver}.tar.gz"
  url = "https://codeload.github.com/osquery/osquery/tar.gz/refs/tags/#{ver}"

  Dir.mktmpdir("osquery-checkout-website-json-generation") do |dir|
    tarfile = File.join(dir, "o.tar.gz")
    download_url_to_path(url, tarfile)

    # While it would be cleaner to do the uncompress in ruby, we can
    # be pragmatic here.
    Dir.chdir(dir) do
      Dir.mkdir("osquery")
      system("tar", "xzf", tarfile, "-C", "osquery", "--strip-components=1")
      raise("Tar failed") unless $?.success?
    end

    yield(File.join(dir, "osquery"))
  end
end

def generate_table_api(version, website_dir)
  tmp_dir_with_osquery_version(version) do |dir|
    generate_table_api_python(version, dir, website_dir)
  end
end

def generate_table_api_python(version, dir, website_dir)

  cmd = [
    "python3",
    File.join(dir, 'tools/codegen/genwebsitejson.py'),
    "--specs",  File.join(dir, "specs"),
  ]

  output, status = Open3.capture2(*cmd)

  unless status.success?
    puts "Failed to run #{cmd.join(' ')}:"
    puts output
    exit 1
  end

  File.open(File.join(website_dir, "src/data/osquery_schema_versions/#{version}.json"), 'w') do |f|
    f.write(output)
  end

  return nil
end

def generate_version_metadata(version, website_dir, set_current: true)
  file_path = File.join(website_dir, "#{website_dir}/src/data/osquery_metadata.json")

  data = nil
  File.open(file_path) do |f|
    data = JSON.load(f)
  end

  data["all_versions"] << version
  data["all_versions"].uniq!
  data["current_version"] = version if set_current

  File.open(file_path, 'w') do |f|
    f.write(JSON.pretty_generate(data))
  end

  return nil
end

# What are we doing?
ver = ARGV[0]
website_checkout = ARGV[1]

# Quick sanity check on args
usage(err: "Invalid version") unless ver&.match(/^[0-9.]+$/)
usage(err: "Invalid website directory") unless website_checkout && Dir.exists?(website_checkout)

# Checkout the requested version in the osquery dir, and generate
# metadata.  This would be better replaced by something in the
# build. See https://github.com/osquery/osquery/issues/7131
generate_table_api(ver, website_checkout)
generate_version_metadata(ver, website_checkout)

raise "Early exit!"

# Generate the list of downloads, and their digests
entries = []
entries_debug = []

entries << gen_download_entry(ver, "darwin", "")
entries << gen_download_entry(ver, "windows", "")

["x86_64", "arm64"].each do |arch|
  entries << gen_download_entry(ver, "linux", arch)
  ["deb", "rpm"].each do |plat|
    entries << gen_download_entry(ver, plat, arch)
    entries_debug << gen_download_entry(ver, plat, arch, debug: true)
  end
end




data = {
  version: ver,
  url: BASE_URL,
  downloads: {
    official: entries,
    debug: entries_debug,
  },
}

File.open(File.join(website_checkout, "src/data/osquery_package_versions/#{ver}.json"), 'w') do |f|
  puts "Writing packages to #{f.path}"
  f.write(JSON.pretty_generate(data))
end
