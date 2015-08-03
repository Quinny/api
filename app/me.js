var router = require("./router.js");

var me = {
    name: "Quinn Perfetto",
    image: "http://quinnftw.com/images/me.png",
    resume: "http://quinnftw.com/resume.pdf",
    accounts: {
        "github": "https://quinnftw.com/quinny",
        "linkedin" : "ca.linkedin.com/in/qperfetto"
    },
    email: "quinnperfetto@live.com",
    languages: [
        "C++",
        "C",
        "C#",
        "Python",
        "Javascript",
        "Go",
        "Latex",
        "Bash",
        "Java",
        "HTML5",
        "CSS3"
    ],
    tools: [
        "Django",
        "Node.js",
        "Angular",
        "Vim",
        "Git",
        "Jekyll",
        "jQuery",
        "MySQL",
        "Sqllite",
        "Windows Forms",
        "WPF"
    ]
};

function getMe(callback) {
    callback(me);
}

exports.registerRoutes = function (app) {
    router.jsonResponse(app, "/me", getMe);
}
