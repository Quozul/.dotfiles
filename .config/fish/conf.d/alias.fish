alias e="exa -lhag"
alias dot='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
alias git-date='f(){ touch -t "$(date -d "$1" "+%Y%m%d%H%M")" "$2" && GIT_AUTHOR_DATE=$(date -d "$1") GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE" git commit -S -s --amend --date="$(date -d "$1" "+%a, %d %b %Y %H:%M:%S %Z")" --reset-author --no-edit; unset -f f; }; f'
