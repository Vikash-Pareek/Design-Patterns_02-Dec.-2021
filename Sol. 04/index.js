/*
4. Design and code to solve below problem:
We are given intervals of times, e.g. 1Jan18 - 30Jun18, 2Feb18 - 23May18, 3Mar18 - 08Jul18 etc.
The output for these intervals should be as below:

a) CASE I
1Jan18-1Feb, 2Feb-2Mar, 3Mar-22May, 23May-29Jun, 30Jun-8Jul

b) CASE II
1Jan-1Feb, 2Feb-2Mar, 3Mar-8Jul

Implement these cases as test functions. The user should choose which case to run.
*/

class MainInterval {
    constructor() {
        this.months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", 
                        "aug", "sept", "oct", "nov", "dec"];
        this.daysPerMonth = MainInterval.daysPerMonth();
        this.monthsMap = (() => {
            const map = new Map();
            const months = ["jan", "feb", "mar", "apr", "may", "jun", 
                            "jul", "aug", "sept", "oct", "nov", "dec"];
            months.forEach((month, ele) => map.set(month, ele));
            return map;
        })();
    }
    
    getIntervals(intervals, caseCount) {
        if (caseCount !== 2) {
            return this.case1(intervals);
        } else {
            return this.case2(intervals);
        }
    }

    case1(dateIntervals) {
        let intervalRange = [];
        dateIntervals.forEach(interval => {
            intervalRange.push(...interval);
        });
        intervalRange = this.sortIntervals(intervalRange);
        return this.setIntervalsFromRange(intervalRange);
    }

    case2(dateIntervals) {
        let range = [];
        dateIntervals.forEach(interval => {
            range.push(...interval[0]);
        });
        range.push(dateIntervals[dateIntervals.length - 1][1]);
        range = this.sortIntervals(range);
        return this.setIntervalsFromRange(range);
    }

    setIntervalsFromRange(intervalRange) {
        const rangeCount = intervalRange.length;
        const intervals = [];
        let singleInterval = [];

        for(let i = 0, j = 1; i < rangeCount - 1, j < rangeCount; i++, j++) {
            singleInterval.push(intervalRange[i]);
            if (j < rangeCount - 1) {
                let split = intervalRange[j].split('-');
                let date = Number(split[0]);
                if (date === 1) {
                    const monthIndex = this.monthsMap.get(split[1]) - 1;
                    let previousMonth = this.months[monthIndex];
                    let newDate = this.daysPerMonth.get(previousMonth);
                    split[0] = newDate;
                    split[1] = previousMonth;
                } else {
                    date -= 1;
                    split[0] = date;
                }
                singleInterval.push(split.join('-'));
            } else {
                singleInterval.push(intervalRange[j]);
            }
            intervals.push(singleInterval);
            singleInterval = [];
        }
        return intervals;
    }

    sortIntervals(intervals) {
        intervals.sort((x, y) => {
            const month1 = x.split('-')[1];
            const month2 = y.split('-')[1];
            return this.monthsMap.get(month1) - this.monthsMap.get(month2);
        });
        return intervals;
    }

    static daysPerMonth() {
        const map = new Map();
        map.set("jan", 31);
        map.set("feb", 28);
        map.set("mar", 31);
        map.set("apr", 30);
        map.set("may", 31);
        map.set("jun", 30);
        map.set("jul", 31);
        map.set("aug", 31);
        map.set("sept", 30);
        map.set("oct", 31);
        map.set("nov", 30);
        map.set("dec", 31);
        return map;
    }
}

const sortedIntervals = new MainInterval();

const intervals = [["1-jan", "30-jun"], ["2-feb", "23-may"], ["3-mar", "8-jul"]];

console.log("Intervals with CASE 1: ", sortedIntervals.getIntervals(intervals, 1));
console.log("Intervals with CASE 2: ", sortedIntervals.getIntervals(intervals, 2));
