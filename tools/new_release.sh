#!/bin/bash

#  Copyright (c) 2015, Facebook, Inc.
#  All rights reserved.
#
#  This source code is licensed in accordance with the terms specified in
#  the LICENSE file found in the root directory of this source tree.

set -e

URL=https://pkg.osquery.io

function usage() {
  echo "${BASH_SOURCE[0]} VERSION PATH_TO_OSQUERY PATH_TO_SITE"
}

function main() {
  if [[ $# < 3 ]]; then
    usage
    exit 1
  fi

  VERSION=$1
  OSQUERY=$2
  SITE=$3

  echo "[+] Checking out version $VERSION"
  (cd $OSQUERY; git checkout $VERSION)

  echo "[+] Writing new table API"
  GENJSON="$OSQUERY/tools/codegen/genwebsitejson.py"
  PYTHONPATH=$OSQUERY/build/python_path python3 "$GENJSON" --specs "$OSQUERY/specs" > "$SITE/src/data/osquery_schema_versions/${VERSION}.json"

  echo "[+] Writing new version metadata"
  GENMETADATA="$OSQUERY/tools/codegen/genwebsitemetadata.py"
  PYTHONPATH=$OSQUERY/build/python_path python3 "$GENMETADATA" --file "$SITE/src/data/osquery_metadata.json" --version "$VERSION"

  printf "[+] Downloading and hashing packages...\n"
  PACKAGE="$URL/linux/osquery-${VERSION}_1.linux_x86_64.tar.gz"
  echo "[+] Downloading $PACKAGE"
  LINUX=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')

  PACKAGE="$URL/deb/osquery_${VERSION}_1.linux.amd64.deb"
  echo "[+] Downloading $PACKAGE"
  DEB=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')

  PACKAGE="$URL/rpm/osquery-${VERSION}-1.linux.x86_64.rpm"
  echo "[+] Downloading $PACKAGE"
  RPM=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')

  PACKAGE="$URL/darwin/osquery-${VERSION}.pkg"
  echo "[+] Downloading $PACKAGE"
  DARWIN=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')

  PACKAGE="$URL/windows/osquery-${VERSION}.msi"
  echo "[+] Downloading $PACKAGE"
  WINDOWS=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')

  # Legacy debug package for macOS.
  #PACKAGE="$URL/darwin/osquery-debug-${VERSION}.pkg"
  #echo "[+] Downloading $PACKAGE"
  #DEBUG_DARWIN=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')

  PACKAGE="$URL/rpm/osquery-debuginfo-${VERSION}-1.linux.x86_64.rpm"
  echo "[+] Downloading $PACKAGE"
  DEBUG_RPM=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')

  PACKAGE="$URL/deb/osquery-dbgsym_${VERSION}_1.linux.amd64.deb"
  echo "[+] Downloading $PACKAGE"
  DEBUG_DEB=$(curl $PACKAGE | shasum -a 256 | awk '{print $1}')

  PACKAGES="$SITE/src/data/osquery_package_versions/${VERSION}.json"
  rm -f "${PACKAGES}"
  cat << EOF >> ${PACKAGES}
{
  "version": "$VERSION",
  "url": "https://pkg.osquery.io",
  "downloads": {
    "official": [
      {
        "type": "macOS",
        "package": "osquery-${VERSION}.pkg",
        "content": "$DARWIN",
        "platform": "darwin"
      },
      {
        "type": "Linux",
        "package": "osquery-${VERSION}_1.linux_x86_64.tar.gz",
        "content": "$LINUX",
        "platform": "linux"
      },
      {
        "type": "RPM",
        "package": "osquery-${VERSION}-1.linux.x86_64.rpm",
        "content": "$RPM",
        "platform": "rpm"
      },
      {
        "type": "Debian",
        "package": "osquery_${VERSION}_1.linux.amd64.deb",
        "content": "$DEB",
        "platform": "deb"
      },
      {
        "type": "Windows",
        "package": "osquery-${VERSION}.msi",
        "content": "$WINDOWS",
        "platform": "windows"
      }
    ],
    "debug": [
      {
        "type": "RPM",
        "package": "osquery-debuginfo-${VERSION}-1.linux.x86_64.rpm",
        "content": "$DEBUG_RPM",
        "platform": "rpm"
      },
      {
        "type": "Debian",
        "package": "osquery-dbgsym_${VERSION}_1.linux.amd64.deb",
        "content": "$DEBUG_DEB",
        "platform": "deb"
      }
    ]
  }
}
EOF
  echo "[+] Hashes written to $PACKAGES"
  echo "[+] Finished"
}

main $@
