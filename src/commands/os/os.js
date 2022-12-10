import { INVALID_INPUT } from '../errors.js';
import { validateArgumentsCount } from '../validation.js';
import { arch, cpus, EOL, homedir, userInfo } from 'os';

const os = async args => {
    validateArgumentsCount(args.length, 1);

    const arg = args[0];

    switch (arg) {
        case '--EOL':
            console.log(JSON.stringify(EOL));
            break;
        case '--cpus':
            const cpuList = cpus().map(cpu => {
                const cpuView = {
                    model: cpu.model,
                    speed: toGhz(cpu.speed)
                };

                return cpuView;
            });

            console.table(cpuList);
            break;
        case '--homedir':
            console.log(homedir());
            break;
        case '--username':
            console.log(userInfo().username);
            break;
        case '--architecture':
            console.log(arch());
            break;
        default:
            throw new Error(INVALID_INPUT);
    }
};

const toGhz = speed => {
    speed = speed / 1000
    const speedInGhz = speed < 0.1 ? speed * 100 : speed
    return speedInGhz + ' GHz'
};

export default os;