basic.clear_screen()

def on_forever():
    if pins.digital_read_pin(DigitalPin.P4) == 1:
        pins.digital_write_pin(DigitalPin.P13, 1)
        basic.pause(1000)
        pins.digital_write_pin(DigitalPin.P13, 0)
    elif pins.digital_read_pin(DigitalPin.P6) == 1:
        pins.digital_write_pin(DigitalPin.P14, 1)
        basic.pause(1000)
        pins.digital_write_pin(DigitalPin.P14, 0)
    elif pins.digital_read_pin(DigitalPin.P9) == 1:
        pins.digital_write_pin(DigitalPin.P15, 1)
        basic.pause(1000)
        pins.digital_write_pin(DigitalPin.P15, 0)
    elif pins.digital_read_pin(DigitalPin.P8) == 1:
        pins.digital_write_pin(DigitalPin.P16, 1)
        basic.pause(1000)
        pins.digital_write_pin(DigitalPin.P16, 0)
    else:
        pass
basic.forever(on_forever)
