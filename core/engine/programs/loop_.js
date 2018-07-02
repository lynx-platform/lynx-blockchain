var globals = process.argv[2]; // value
var input = process.argv[3]; // input


for (let i = 0; i < 100; i++) {
    globals.a++;
}

console.log(globals.a);
