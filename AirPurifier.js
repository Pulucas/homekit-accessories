const hap = require('hap-nodejs');
const Accessory = hap.Accessory;
const Characteristic = hap.Characteristic;
const CharacteristicEventTypes = hap.CharacteristicEventTypes;
const Service = hap.Service;

const accessoryUuid = hap.uuid.generate("art.lucash.myAccessCode");
const myAirPurifier = new Accessory("My Air Purifier", accessoryUuid);
const myAirPurifierService = new Service.AirPurifier("My Air Purifier");

let currentState = false;
let currentFanSpeed = 0;

const onCharacteristic = myAirPurifierService.getCharacteristic(Characteristic.On);
const fanSpeed = myAirPurifierService.getCharacteristic(Characteristic.RotationSpeed);

onCharacteristic.on(CharacteristicEventTypes.GET, callback => {
  console.log("Queried current state:", currentState);
  callback(undefined, currentState);
});

onCharacteristic.on(CharacteristicEventTypes.SET, (value, callback) => {
  console.log("Settings state to:", value);
  currentState = value;
  callback();
});

fanSpeed.on(CharacteristicEventTypes.GET, callback => {
  console.log("Queried fan speed:", currentFanSpeed);
  callback(undefined, currentFanSpeed);
});

fanSpeed.on(CharacteristicEventTypes.SET, (value, callback) => {
  console.log("Settings fan speed to:", value);
  callback();
});

myAirPurifier.addService(myAirPurifierService);

myAirPurifier.publish({
  username: 'AA:BB:CC:12:34:56',
  pincode: genPincode(),
  category: Accessory.Categories.AIR_PURIFIER
});

console.log("Accessory setup finished");

function genPincode() {
  // Generates a random pincode on startup
  let randomCode = parseInt(Math.random() * 100000000);
  let pincode = randomCode.toString().split("");
  while (pincode.length != 8) {
    randomCode = parseInt(Math.random() * 100000000);
    pincode = randomCode.toString().split("");
    }
    pincode.splice(3, 0, "-");
    pincode.splice(6, 0, "-");
    console.log("pinode is " + pincode.join(""));
  return pincode.join("");
}
