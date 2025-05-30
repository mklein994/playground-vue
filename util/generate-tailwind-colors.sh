#!/bin/bash

script_dir="$(dirname "$0")"
tmp="$(mktemp --tmpdir="${script_dir}" --suffix=.js)"

trap 'rm -f "${tmp}"' EXIT

cat <<'JS' >"${tmp}"
export { default } from "tailwindcss/colors";
JS

dst_file="${script_dir}/../src/tokens/vendor/tailwind.ts"
echo -n "export default " >"${dst_file}"
"${script_dir}/js2json.js" --compact "${tmp}" >>"${dst_file}"
exit_code=$?
echo -n ";" >>"${dst_file}"

exit "${exit_code}"
