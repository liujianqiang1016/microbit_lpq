basic.clearScreen()
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.on()
I2C_LCD1602.BacklightOn()
let motor = stepperMotor.createMotor(
DigitalPin.P0,
DigitalPin.P1,
DigitalPin.P2,
DigitalPin.P3
)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P4) == 1) {
        pins.digitalWritePin(DigitalPin.P13, 1)
        motor.moveClockwise(1180, stepUnit.Steps)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P13, 0)
    } else if (pins.digitalReadPin(DigitalPin.P6) == 1) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        motor.moveAntiClockwise(1180, stepUnit.Steps)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P14, 0)
    } else if (pins.digitalReadPin(DigitalPin.P7) == 1) {
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P15, 0)
    } else if (pins.digitalReadPin(DigitalPin.P8) == 1) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P16, 0)
    } else {
    	
    }
})
basic.forever(function () {
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
    I2C_LCD1602.ShowNumber(DS3231.year(), 0, 0)
    I2C_LCD1602.ShowString("-", 4, 0)
    I2C_LCD1602.ShowNumber(DS3231.month(), 5, 0)
    I2C_LCD1602.ShowString("-", 7, 0)
    I2C_LCD1602.ShowNumber(DS3231.date(), 8, 0)
    I2C_LCD1602.ShowNumber(DS3231.hour(), 0, 1)
    I2C_LCD1602.ShowString(":", 2, 1)
    I2C_LCD1602.ShowNumber(DS3231.minute(), 3, 1)
    I2C_LCD1602.ShowString(":", 5, 1)
    I2C_LCD1602.ShowNumber(10, 6, 1)
})
