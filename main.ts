function ElevatorUpAndDown (floor_count: number) {
    if (floor_count > 0) {
        motor.moveClockwise(1180 * Math.abs(floor_count), stepUnit.Steps)
    } else {
        motor.moveAntiClockwise(1180 * Math.abs(floor_count), stepUnit.Steps)
    }
}
function Display () {
    I2C_LCD1602.ShowString("Terry's Elevator", 0, 0)
    if (floor_change_state == 2) {
        I2C_LCD1602.ShowString("floor", 0, 1)
        I2C_LCD1602.ShowNumber(current_floor, 6, 1)
        I2C_LCD1602.ShowString("->", 8, 1)
        I2C_LCD1602.ShowNumber(targe_floor, 11, 1)
    } else if (floor_change_state == 1) {
        I2C_LCD1602.ShowString("floor ", 0, 1)
        I2C_LCD1602.ShowNumber(current_floor, 6, 1)
        I2C_LCD1602.ShowString("     ", 7, 1)
        floor_change_state = 0
    }
}
let motor: stepperMotor.Motor = null
let targe_floor = 0
let current_floor = 0
let floor_change_state = 0
floor_change_state = 1
let lcd_light_flag = 1
let key_count = 0
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
    Display()
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P4) == 1) {
        key_count += 1
        if (key_count > 5) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            targe_floor = 1
            floor_change_state = 2
            ElevatorUpAndDown(targe_floor - current_floor)
            current_floor = 1
            floor_change_state = 1
            pins.digitalWritePin(DigitalPin.P13, 0)
            key_count = 0
        }
    } else if (pins.digitalReadPin(DigitalPin.P6) == 1) {
        key_count += 1
        if (key_count > 5) {
            pins.digitalWritePin(DigitalPin.P14, 1)
            targe_floor = 2
            floor_change_state = 2
            ElevatorUpAndDown(targe_floor - current_floor)
            current_floor = 2
            floor_change_state = 1
            pins.digitalWritePin(DigitalPin.P14, 0)
            key_count = 0
        }
    } else if (pins.digitalReadPin(DigitalPin.P7) == 1) {
        key_count += 1
        if (key_count > 5) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            targe_floor = 3
            floor_change_state = 2
            ElevatorUpAndDown(targe_floor - current_floor)
            current_floor = 3
            floor_change_state = 1
            pins.digitalWritePin(DigitalPin.P15, 0)
            key_count = 0
        }
    } else if (pins.digitalReadPin(DigitalPin.P8) == 1) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(1000)
        if (lcd_light_flag == 0) {
            lcd_light_flag = 1
            I2C_LCD1602.BacklightOn()
            I2C_LCD1602.clear()
        } else {
            lcd_light_flag = 0
            I2C_LCD1602.BacklightOff()
            I2C_LCD1602.clear()
        }
        pins.digitalWritePin(DigitalPin.P16, 0)
    } else {
        key_count = 0
    }
})
