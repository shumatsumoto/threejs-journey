uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main() {
    // float a = 1.0;
    // float b = 2.0;
    // float c = a + b;

    // vec3 purpleColor = vec3(1.0, 2.0, 3.0);
    // vec2 uv = purpleColor.yz;

    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelPosition.x * 20.0) * .1;
    modelPosition.z += aRandom * 0.1; // Use aRandom to modify the z position

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vRandom = aRandom;
}