const fs = require("fs/promises")
const position = "top"

const moduleGroups = {
    "modules-left": ["sway/workspaces", "custom/spotify"],
    "modules-center": ["clock"],
    "modules-right": ["backlight", "pulseaudio", "memory", "cpu", "battery", "tray"],
}

const backgroundColor = "black"
const foregroundColor = "white"

const colors = [
    "#F28FAD",
    "#ABE9B3",
    "#FAE3B0",
    "#96CDFB",
    "#F5C2E7",
    "#89DCEB",
    "#D9E0EE",
    "#F28FAD",
    "#ABE9B3",
    "#FAE3B0",
    "#96CDFB",
    "#F5C2E7",
    "#89DCEB",
    "#D9E0EE",
]

const outputModuleGroups = {
    position: "top",
    "cpu": {
        "format": "\ue266 {}%",
    },
    "battery": {
        "format": "{icon} {capacity}%",
        "format-icons": ["", "", "", "", ""],
    },
    "memory": {
        "format": "\udb80\udf5b {used:0.1f}G"
    },
    "clock": {
        "interval": 5,
        "format": "{:%Y-%m-%d %H:%M:%S}",
    },
    "pulseaudio": {
        "format": "{icon} {volume}%",
        "format-bluetooth": "{volume}% {icon}",
        "format-muted": "",
        "format-icons": {
            "headphone": "",
            "hands-free": "",
            "headset": "",
            "phone": "",
            "portable": "",
            "car": "",
            "default": ["", ""]
        },
        "scroll-step": 1,
        "on-click": "pavucontrol",
        "ignored-sinks": ["Easy Effects Sink"]
    },
    "custom/spotify": {
        "exec": "/usr/bin/python3 /home/erwan/.config/waybar/mediaplayer.py --player spotify",
        "format": " {}",
        "return-type": "json",
        "max-length": 100,
    },
    "sway/window": {
        "format": "{title}",
        "max-length": 100,
    },
    "sway/workspaces": {
		"disable-scroll": true,
		"all-outputs": false,
		"current-only": false,
		"persistent_workspaces": {
			"10": ["DP-1"],
			"11": ["DP-1"],
			"12": ["DP-1"],
			"13": ["DP-1"],
			"14": ["DP-1"],
			"15": ["DP-1"],
			"16": ["DP-1"],
			"17": ["DP-1"],
			"18": ["DP-1"],
			"19": ["DP-1"],

			"00": ["DP-3"],
			"01": ["DP-3"],
			"02": ["DP-3"],
			"03": ["DP-3"],
			"04": ["DP-3"],
			"06": ["DP-3"],
			"07": ["DP-3"],
			"08": ["DP-3"],
			"09": ["DP-3"]
		},
		"format": "{icon}",
		"format-icons": {
			"10": "〇",
			"11": "一",
			"12": "二",
			"13": "三",
			"14": "四",
			"15": "五",
			"16": "六",
			"17": "七",
			"18": "八",
			"19": "九",

			"00": "〇",
			"01": "一",
			"02": "二",
			"03": "三",
			"04": "四",
			"05": "五",
			"06": "六",
			"07": "七",
			"08": "八",
			"09": "九"
         }
     },
}
let outputScss = `* {
	font-size: 16px;
	font-family: monospace;
}

#workspaces button {
    transition: none;
    border-radius: 0;
    border: none;
    color: ${foregroundColor};
}

#workspaces button.focused {
    background-color: #c49ec4;
}

#workspaces button.urgent {
    background-color: #f38ba8;
}

#workspaces button:hover {
	background-color: #c49ec4;
}

#workspaces button, #cpu, #memory, #pulseaudio, #window, #custom-spotify, #clock, #battery, #backlight, #tray{
	padding: 0 8px;
}
`

const arrows = {
    "left": {format: "", tooltip: false},
    "center": {},
    "right": {format: "", tooltip: false}
}
let index = 0, i = 0

function getCssKey(module) {
    if (module.includes("/")) {
        if (module.startsWith("custom/")) {
            return module.replace("/", "-")
        }
        return module.split("/").at(-1)
    }
    return module
}

for (const key in moduleGroups) {
    const arrow = arrows[key.split("-").at(-1)]

    if (Object.hasOwnProperty.call(moduleGroups, key)) {
        const modules = moduleGroups[key];
        const outputModules = []

        for (const module of modules) {
            const color = colors[index]
            index = (index + 1) % (colors.length -1)
            const name = `arrow-${index}`
            const isLast = ++i === modules.length
            const nextColor = isLast ? backgroundColor : colors[index]
            console.log(i, modules.length, nextColor, color)

            outputModules.push(module)
            outputModules.push(`custom/${name}`)
            outputModuleGroups[`custom/${name}`] = arrow
            outputScss += `
#${getCssKey(module)} {
    color: ${foregroundColor};
    background-color: ${backgroundColor};
}

#custom-${name} {
    color: ${foregroundColor};
    background-color: ${backgroundColor};
}
`
        }

        outputModuleGroups[key] = outputModules
    }
}

outputScss += `
window#waybar {
	background: ${backgroundColor};
	color: ${foregroundColor};
}
`;

(async() => {
    await fs.writeFile("./config", JSON.stringify(outputModuleGroups, " ", 2))
    await fs.writeFile("./style.css", outputScss)
})()
