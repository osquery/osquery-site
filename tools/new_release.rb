#!/usr/bin/env ruby

require 'digest'
require 'json'
require 'net/http'
require 'net/https'
require 'ostruct'
require 'uri'

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



ver="4.8.0"



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

require 'pry'
binding.pry

puts JSON.pretty_generate(data)
