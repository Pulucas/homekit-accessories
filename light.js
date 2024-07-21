const hap = require('hap-nodejs');
const Accessory = hap.Accessory;
const Characteristic = hap.Characteristic;
const CharacteristicEventTypes = hap.CharacteristicEventTypes;
const Service = hap.Service;

const accessoryUuid = hap.uuid.generate("art.lucash.myLight");
const myLight = new Accessory("My Light", accessoryUuid);
const myLightService = new Service.Lightbulb("My Light");

let currentLightState = false;
let currentBrightnessLevel = 100;

const onCharacteristic = myLightService.getCharacteristic(Characteristic.On);
const brightnessCharacteristic = myLightService.getCharacteristic(Characteristic.Brightness);

onCharacteristic.on(CharacteristicEventTypes.GET, callback => {
  console.log("Queried current light state:", currentLightState);
  callback(undefined, currentLightState);
});

onCharacteristic.on(CharacteristicEventTypes.SET, (value, callback) => {
  console.log("Settings light state to:", value);
  currentLightState = value;
  callback();
});

brightnessCharacteristic.on(CharacteristicEventTypes.GET, callback => {
  console.log("Queried current brightness level:", currentBrightnessLevel);
  callback(undefined, currentBrightnessLevel);
});

brightnessCharacteristic.on(CharacteristicEventTypes.SET, (value, callback) => {
  console.log("Setting brightness level to:", value);
  currentBrightnessLevel = value;
  callback();
});

myLight.addService(myLightService);

// set your own username (mac-address)
myLight.publish({
  username: 'AA:BB:CC:12:34:56',
  pincode: genPincode(),
  category: Accessory.Categories.LIGHTBULB
});

console.log("Accessory setup finished");

function genPincode() {
  // Generates a random pincode on startup
  const randomCode = parseInt(Math.random() * 100000000);
  const pincode = randomCode.toString().split("");
  pincode.splice(3, 0, "-");
  pincode.splice(6, 0, "-");
  console.log("pinode is " + pincode.join(""));
  return pincode.join("");
}

// function doSomething(state) {
//   if (state) console.log("Light is on");
//   else console.log("Light is off");
// };
