namespace SpriteKind {
    export const Foreground = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    truck.vy = -200
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`empty cave`, function (sprite, location) {
    game.over(true)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    state = "walking-left"
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    truck.vx = 0
    state = "idle"
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`spikes`, function (sprite, location) {
    game.over(false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    state = "walking"
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`spikes-up`, function (sprite, location) {
    game.over(false)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    truck.vx = 0
    state = "idle"
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`acid`, function (sprite, location) {
    music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
let truck: Sprite = null
let state = ""
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    ................................................................................................................................................................
    `)
let lastState = "idle"
state = "idle"
music.play(music.createSong(hex`00780004080200`), music.PlaybackMode.UntilDone)
truck = sprites.create(assets.image`truck3`, SpriteKind.Player)
truck.y = 0
truck.ay = 500
truck.vx = 0
scene.cameraFollowSprite(truck)
animation.runImageAnimation(
truck,
assets.animation`truck3 animated`,
100,
false
)
let cloud = sprites.create(img`
    .........bbbb...........
    .......bb1111bb.........
    ......bb111111bbbbb.....
    ......b1111111ddd11b....
    ......b11111111d1111b...
    ...bbbd11111111d1111b...
    ..b11111111111111111bb..
    .b11111111111111111d11b.
    .b111d11111111111111111b
    cdd1d111111111111111111c
    cdddd11111111111111111dc
    cddbd11111d11111dd111dc.
    .cbbdd111dddd11ddbdddcc.
    .ccbbdddddbdddddddbcc...
    ...cccdddbbbdddddcc.....
    ......ccccccccccc.......
    `, SpriteKind.Foreground)
cloud.x = 300
cloud.vx = -20
forever(function () {
    console.log(cloud.x)
    if (lastState != "walking" && state == "walking") {
        console.log("->walking right")
        lastState = "walking"
        truck.vx = 100
        animation.runImageAnimation(
        truck,
        assets.animation`truck3 animated`,
        100,
        true
        )
    }
    if (lastState != "walking-left" && state == "walking-left") {
        console.log("->walking left")
        lastState = "walking-left"
        truck.vx = -100
        animation.runImageAnimation(
        truck,
        assets.animation`truck3 animated`,
        100,
        true
        )
    }
    if (lastState != "idle" && state == "idle") {
        console.log("->idle")
        lastState = "idle"
        truck.vx = 0
        music.stopAllSounds()
        animation.runImageAnimation(
        truck,
        assets.animation`truck3 animated`,
        100,
        false
        )
    }
    if (truck.vx == 0) {
        state = "idle"
    }
    if (cloud.x <= 13) {
        cloud.x = randint(200, 250)
        cloud.y = randint(10, 30)
        cloud.vx = randint(-15, -30)
    }
})
