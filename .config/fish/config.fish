if status is-interactive
    # Commands to run in interactive sessions can go here
end

fish_add_path /home/erwan/.cargo/bin/

starship init fish | source
