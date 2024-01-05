import chalk from "chalk";

const log = console.log;
const error = console.error;

/**
 * Styling the output messages
 *
 * Chalk utilizes the entire terminal color gamut that is offered.
 * From a set of ANSI colors to the standard 256-bit color range, to using HEX colors and RGB.
 *
 * This flexibility allows us to truly get creative with our colors.
 *
 * We have provided a set of both text colors and background colors on the RGB color spectrum.
 * It also allows for additional text decorators like bold, underline and decorators to be further applied on top of each instance of chalk.
 */

// Background color
export const bgBlue = chalk.bgRgb(52, 158, 219);
export const bgCyan = chalk.bgRgb(26, 188, 156);
export const bgGreen = chalk.bgRgb(46, 204, 113);
export const bgPurple = chalk.bgRgb(142, 68, 173);
export const bgRed = chalk.bgRgb(231, 76, 60);
export const bgWhite = chalk.bgRgb(236, 240, 241);
export const bgYellow = chalk.bgRgb(241, 196, 15);

// Text Color
export const txBlue = chalk.rgb(52, 158, 219);
export const txCyan = chalk.rgb(26, 188, 156);
export const txGreen = chalk.rgb(46, 204, 113);
export const txPurple = chalk.rgb(142, 68, 173);
export const txRed = chalk.rgb(231, 76, 60);
export const txWhite = chalk.rgb(236, 240, 241);
export const txYellow = chalk.rgb(241, 196, 15);

// log(txYellow("Hello , I'm a Yellow string"));
