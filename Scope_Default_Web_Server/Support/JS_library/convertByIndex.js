function convertU8SingleOutput(u8) {
let result;
// SIGNED
// MSB determines positive/negative
result = u8;
// console.log(u8);
if (u8 & (1 << 7))
{
    // u8 
    result = u8 - 128;
    result *= -1;
}
// result = (u8 & (1 << 8)) ? u8 - 256 : u8;
return result;
}