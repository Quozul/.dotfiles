alias e="exa --group-directories-first -lhag"
alias dot='/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME'
alias drun='sudo docker run -it --network=host --device=/dev/kfd --device=/dev/dri --group-add=video --ipc=host --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -v $HOME/dockerx:/dockerx'
#alias git-date='f(){ touch -t "$(date -d "$1" "+%Y%m%d%H%M")" "$2" && GIT_AUTHOR_DATE=$(date -d "$1") GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE" git commit -S -s --amend --date="$(date -d "$1" "+%a, %d %b %Y %H:%M:%S %Z")" --reset-author --no-edit; unset -f f; }; f'
alias drun='sudo docker run -it --network=host --device=/dev/kfd --device=/dev/dri --group-add=video --ipc=host --cap-add=SYS_PTRACE --security-opt seccomp=unconfined -v $HOME/dockerx:/dockerx'
