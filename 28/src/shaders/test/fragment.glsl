varying vec2 vUv;

void main()
{
    float strength =  mod(vUv.x * 5.0, 1.0);
    strength *= step(0.5, strength);

    // if (strength < 0.3) {
    //     strength = 0.0;
    // } else {
    //     strength = 1.0;
    // }

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}