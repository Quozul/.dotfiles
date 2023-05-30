set fish_greeting

starship init fish | source

#nvm use 18

# pnpm
set -gx PNPM_HOME "/home/erwan/.local/share/pnpm"
if not string match -q -- $PNPM_HOME $PATH
  set -gx PATH "$PNPM_HOME" $PATH
end
# pnpm endrtx activate fish | source
rtx activate fish | source
