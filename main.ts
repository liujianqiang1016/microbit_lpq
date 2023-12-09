function ElevatorUpAndDown (floor_count: number) {
    if (floor_count > 0) {
        motor.moveClockwise(1180 * Math.abs(floor_count), stepUnit.Steps)
    } else {
        motor.moveAntiClockwise(1180 * Math.abs(floor_count), stepUnit.Steps)
    }
}
function DisplayDHT11 () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P12,
    true,
    false,
    false
    )
    if (dht11_dht22.readDataSuccessful()) {
        I2C_LCD1602.ShowNumber(dht11_dht22.readData(dataType.humidity), 11, 0)
        I2C_LCD1602.ShowNumber(dht11_dht22.readData(dataType.temperature), 11, 1)
    }
}
function DisplayDS3231 () {
    if (DS3231.month() < 10) {
        I2C_LCD1602.ShowNumber(0, 0, 0)
        I2C_LCD1602.ShowNumber(DS3231.month(), 1, 0)
    } else {
        I2C_LCD1602.ShowNumber(DS3231.month(), 0, 0)
    }
    I2C_LCD1602.ShowString("/", 2, 0)
    if (DS3231.date() < 10) {
        I2C_LCD1602.ShowNumber(0, 3, 0)
        I2C_LCD1602.ShowNumber(DS3231.date(), 4, 0)
    } else {
        I2C_LCD1602.ShowNumber(DS3231.date(), 3, 0)
    }
    if (DS3231.hour() < 10) {
        I2C_LCD1602.ShowNumber(0, 6, 0)
        I2C_LCD1602.ShowNumber(DS3231.hour(), 7, 0)
    } else {
        I2C_LCD1602.ShowNumber(DS3231.hour(), 6, 0)
    }
    I2C_LCD1602.ShowString(":", 8, 0)
    if (DS3231.minute() < 10) {
        I2C_LCD1602.ShowNumber(0, 9, 0)
        I2C_LCD1602.ShowNumber(DS3231.minute(), 10, 0)
    } else {
        I2C_LCD1602.ShowNumber(DS3231.minute(), 9, 0)
    }
    I2C_LCD1602.ShowString(":", 11, 0)
    if (DS3231.second() < 10) {
        I2C_LCD1602.ShowNumber(0, 12, 0)
        I2C_LCD1602.ShowNumber(DS3231.second(), 13, 0)
    } else {
        I2C_LCD1602.ShowNumber(DS3231.second(), 12, 0)
    }
    if (key_count > 5) {
        I2C_LCD1602.ShowString("floor", 0, 1)
        I2C_LCD1602.ShowNumber(current_floor, 6, 1)
        I2C_LCD1602.ShowString("->", 8, 1)
        I2C_LCD1602.ShowNumber(targe_floor, 11, 1)
    } else {
        I2C_LCD1602.ShowString("floor ", 0, 1)
        I2C_LCD1602.ShowNumber(current_floor, 6, 1)
        I2C_LCD1602.ShowString("     ", 7, 1)
    }
}
let motor: stepperMotor.Motor = null
let targe_floor = 0
let current_floor = 0
let key_count = 0
key_count = 0
let dht11_count = 0
current_floor = 1
targe_floor = 1
basic.clearScreen()
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.on()
I2C_LCD1602.BacklightOn()
motor = stepperMotor.createMotor(
DigitalPin.P0,
DigitalPin.P1,
DigitalPin.P2,
DigitalPin.P3
)
basic.forever(function () {
    DisplayDS3231()
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P4) == 1) {
        key_count += 1
        if (key_count > 5) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            targe_floor = 1
            ElevatorUpAndDown(targe_floor - current_floor)
            current_floor = 1
            pins.digitalWritePin(DigitalPin.P13, 0)
            key_count = 0
        }
    } else if (pins.digitalReadPin(DigitalPin.P6) == 1) {
        key_count += 1
        if (key_count > 5) {
            pins.digitalWritePin(DigitalPin.P14, 1)
            targe_floor = 2
            ElevatorUpAndDown(targe_floor - current_floor)
            current_floor = 2
            pins.digitalWritePin(DigitalPin.P14, 0)
            key_count = 0
        }
    } else if (pins.digitalReadPin(DigitalPin.P7) == 1) {
        key_count += 1
        if (key_count > 5) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            targe_floor = 3
            ElevatorUpAndDown(targe_floor - current_floor)
            current_floor = 3
            pins.digitalWritePin(DigitalPin.P15, 0)
            key_count = 0
        }
    } else if (pins.digitalReadPin(DigitalPin.P8) == 1) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P16, 0)
    } else {
        key_count = 0
    }
})
