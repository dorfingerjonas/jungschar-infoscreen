class Job {
    constructor(name, salary, amount, morning, afternoon) {
        this.id = new Date().getTime();
        this.name = name;
        this.salary = salary;
        this.amount = amount;
        this.morning = morning;
        this.afternoon = afternoon;
        this.visible = true;
    }
}

module.exports = Job;