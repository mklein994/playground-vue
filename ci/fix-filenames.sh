#!/bin/bash
#
# Usage: ./ci/fix-filenames.sh <spa | server> <COVERAGE_DIR>

case "${1:?must provide a coverage type}" in
spa) coverageType=spa ;;
server) coverageType=server ;;
*) exit 1 ;;
esac

coverageDir="${2:?coverage dir not set}"
coverageDir="${coverageDir%/}"
files=$(find "${coverageDir}" -name '*.*.html')

if [[ "${coverageType}" == "server" ]]; then
  for f in ${files}; do
    # ./foo/bar/baz.vue.html -> baz.vue.html
    name="$(basename "${f}")"

    # get a list of files containing the basename
    filesWithMatches=$(grep --files-with-matches --recursive --fixed-strings "${name}" "${coverageDir}")

    # escape all dot characters
    oldName="${name//./\\.}"

    # replace the first dot with a dash, and escape the rest of the dot characters
    newName="$(echo "${name}" | sed --expression='s/\./-/' --expression='s/\./\\./g')"

    # loop through each matching file and do the replacement:
    # "... foo.vue.html ..." -> "... foo-vue.html ..."
    for match in ${filesWithMatches}; do
      echo "${name} -> ${name/./-}: ${match}"
      sed --in-place='' "s@${oldName}@${newName}@g" "${match}"
    done

    # Rename the file with the new name:
    # ./foo/bar/baz.vue.html -> ./foo/bar/baz-vue.html
    mv --verbose "${f}" "$(dirname "${f}")/${name/./-}"
  done
else
  for f in ${files}; do
    name="$(basename "${f}")"
    part="${name%%.html}"
    echo "${name} -> ${name/./-}"
    sed -i'' "s@${part/./\\.}@${part/./-}@g" "${coverageDir}/index.html"
    mv -v "${f}" "$(dirname "${f}")/${name/./-}"
  done
fi
