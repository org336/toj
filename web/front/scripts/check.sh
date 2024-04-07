output=$(find . -maxdepth 3 | grep -iv -e "^./README.md2" -e "^./web/front/" -e "^./web/front$" -e "^./web$" -e "^./.git/" -e "^./.git$" -e "^./.github/" -e "^./.github$" -e "^./spec/web/front/" -e "^./spec$" -e "^./spec/web$" -e "^./spec/web/front$")
# assert output is .
if [ "$output" != "." ]; then
  echo "unexpected files: $output"
  echo "exit with 1"
  exit 1
fi