class Validate {
    constructor(Ids) {
        this.Ids = Ids
        this.errors = 0
    }
    validate() {
        console.log("resettign errors")
        this.errors = 0
        this.Ids.forEach(i => {
            this.resetBorder(i.id)
            this.resetLogMsg(i.id)
            this.resetPointError(i.id)
            if (this.getValue(i.id) == "") {
                this.indicateBorderError(i.id, i.highlightBorder)
                console.log("cannot be empty")
                this.logMsg(i.id, "cannot be empty")
                this.indicatePointError(i.id, i.pointError)
            }
            else {
                switch (i.type) {
                    case "email":
                        if (!this.getValue(i.id).match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        )) {
                            // alert("email success")
                            this.indicateBorderError(i.id, i.highlightBorder)
                            console.log("email is not proper")
                            this.logMsg(i.id, i.logMsg ?? "email is not proper")
                            this.indicatePointError(i.id, i.pointError)
                        }
                        break
                    case "string":
                        if (i.hasOwnProperty("length")) {
                            if (parseInt(this.getValue(i.id).length) == parseInt(i.length)) {
                                this.indicateBorderError(i.id, i.highlightBorder)
                                console.log("length is not correct")
                                this.logMsg(i.id, i.logMsg ?? "length is not correct")
                                this.indicatePointError(i.id, i.pointError)
                            }
                        }
                        break
                    case "name":
                        if (this.getValue(i.id).match(/\d/)) {
                            this.indicateBorderError(i.id, i.highlightBorder)
                            console.log("name can't contain numbers")
                            this.logMsg(i.id, i.logMsg ?? "name can't contain numbers")
                            this.indicatePointError(i.id, i.pointError)

                        }
                        if (i.hasOwnProperty("length")) {
                            if (parseInt(this.getValue(i.id).length - 1) == parseInt(i.length)) {
                                this.indicateBorderError(i.id, i.highlightBorder)
                                console.log("length is not correct")
                                this.logMsg(i.id, i.logMsg ?? "length is not correct")
                                this.indicatePointError(i.id, i.pointError)

                            }
                        }
                        break
                    case "number":
                        if (this.getValue(i.id).match(/\D/)) {
                            this.indicateBorderError(i.id, i.highlightBorder)
                            console.log("number can't contain aplhabets")
                            this.logMsg(i.id, i.logMsg ?? "number can't contain aplhabets")
                            this.indicatePointError(i.id, i.pointError)

                        }
                        if (i.hasOwnProperty("length")) {
                            this.checkLength(i)
                        }
                        break
                    case "regex":
                        if (!this.getValue(i.id).match(i.regex)){
                            this.indicateBorderError(i.id, i.highlightBorder)
                            console.error("regex case failed")
                            this.logMsg(i.id, i.logMsg ?? "Field is incorrect")
                            this.indicatePointError(i.id, i.pointError)
                        }
                        if (i.hasOwnProperty("length")) {
                            this.checkLength(i)
                        }
                        break
                }
            }
        });
        return this.errors == 0 ? true : false
    }
    getValue(id) {
        return document.getElementById(id).value
    }
    indicateBorderError(id, ch) {
        this.errors++
        if (ch)
            document.getElementById(id).style.border = "2px solid red"
    }
    resetBorder(id) {
        document.getElementById(id).style.border = "2px solid black"
    }
    logMsg(id, msg) {
        document.getElementById(`${id}log`).style.display = ''
        document.getElementById(`${id}log`).innerText = msg
    }
    resetLogMsg(id) {
        document.getElementById(`${id}log`).style.display = 'none'
    }
    checkLength(i) {
        if (i.length[i.length.length - 1].match(/\D/)) {
            //if less than 
            if (i.length.match("<")) {
                if (this.getValue(i.id).length > parseInt(i.length) - 1) {
                    this.indicateBorderError(i.id, i.highlightBorder)
                    console.log(`must be < ${parseInt(i.length)}`)
                    this.logMsg(i.id, i.logMsg ?? `must be < ${parseInt(i.length)}`)
                    this.indicatePointError(i.id, i.pointError)

                }
            }
            //if greater than 
            if (i.length.match(">")) {
                if (this.getValue(i.id).length < parseInt(i.length) + 1) {
                    this.indicateBorderError(i.id, i.highlightBorder)
                    console.log(`must be > ${parseInt(i.length)}`)
                    this.logMsg(i.id, i.logMsg ?? `must be > ${parseInt(i.length)}`)
                    this.indicatePointError(i.id, i.pointError)

                }
            }
        }
        else {
            if (this.getValue(i.id).length != parseInt(i.length)) {
                this.indicateBorderError(i.id, i.highlightBorder)
                console.log(`must be equal to ${parseInt(i.length)}`)
                this.logMsg(i.id, i.logMsg ?? `must be equal to ${parseInt(i.length)}`)
                this.indicatePointError(i.id, i.pointError)
            }
        }
    }
    indicatePointError(id, ch) {
        if (ch)
            document.getElementById(`${id}*`).innerText = "*"
    }
    resetPointError(id) {
        document.getElementById(`${id}*`).innerText = ""
    }
}
const Ids = [
    {
        "id": "email",
        "type": "email",
        "highlightBorder": true,
        "pointError": true
    },
    {
        "id": "name",
        "type": "name",
        "highlightBorder": true,
        "pointError": true
        // "length": 10,
    },
    {
        "id": "password",
        "type": "regex",
        "highlightBorder": true,
        "length": "5",
        "pointError": true,
        "regex":/apple/,
        "logMsg":"must contain apple"
        // "logMsg": "password must be strong"
    }
]
var v = new Validate(Ids)
document.getElementById("submit").addEventListener("click", function () {
    if(v.validate())
        alert("data validated")
})