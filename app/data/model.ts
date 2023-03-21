import * as BABYLON from "@babylonjs/core";
import maplibregl from 'maplibre-gl'

// World matrix parameters
const worldOrigin = [-84.3891, 33.7528];
const worldAltitude = 0;

// Maplibre.js default coordinate system (no rotations)
// +x east, -y north, +z up
//const worldRotate = [0, 0, 0];

// Babylon.js default coordinate system
// +x east, +y up, +z north
const worldRotate = [Math.PI / 2, 0, 0];

// Calculate mercator coordinates and scale
const worldOriginMercator = maplibregl.MercatorCoordinate.fromLngLat(
  worldOrigin,
  worldAltitude
);
const worldScale = worldOriginMercator.meterInMercatorCoordinateUnits();

// Calculate world matrix
const worldMatrix = BABYLON.Matrix.Compose(
  new BABYLON.Vector3(worldScale, worldScale, worldScale),
  BABYLON.Quaternion.FromEulerAngles(
    worldRotate[0],
    worldRotate[1],
    worldRotate[2]
  ),
  new BABYLON.Vector3(
    worldOriginMercator.x,
    worldOriginMercator.y,
    worldOriginMercator.z
  )
);

// configuration of the custom layer for a 3D model per the CustomLayerInterface
export const modelLayer = {
  id: '3d-model',
  type: 'custom',
  renderingMode: '3d',
  onAdd: async function (map, gl) {
    this.engine = new BABYLON.Engine(
      gl,
      true, {
        useHighPrecisionMatrix: true // Important to prevent jitter at mercator scale
      },
      true
    );
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.autoClear = false;
    this.scene.detachControl();

    this.scene.beforeRender = () => {
      this.engine.wipeCaches(true);
    };

    // create simple camera (will have its project matrix manually calculated)
    this.camera = new BABYLON.Camera(
      'Camera',
      new BABYLON.Vector3(0, 0, 0),
      this.scene
    );

    // create simple light
    const light = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(0, 0, 100),
      this.scene
    );
    light.intensity = 0.7;

    // Add debug axes viewer, positioned at origin, 10 meter axis lengths
    new BABYLON.AxesViewer(this.scene, 10);

    // load GLTF model in to the scene
    const modelContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
      '/models/34M_17/34M_17.gltf',
      '',
      this.scene
    )
      modelContainer.addAllToScene();

      const rootMesh = modelContainer.createRootMesh();

      // If using maplibre.js coordinate system (+z up)
      //rootMesh.rotation.x = Math.PI/2

      // Create a second mesh
      const rootMesh2 = rootMesh.clone();

      // Position in babylon.js coordinate system
      rootMesh2.position.x = 25; // +east, meters
      rootMesh2.position.z = 25; // +north, meters

    this.map = map;
  },
  render: function (gl, matrix) {
    const cameraMatrix = BABYLON.Matrix.FromArray(matrix);

    // world-view-projection matrix
    const wvpMatrix = worldMatrix.multiply(cameraMatrix);

    this.camera.freezeProjectionMatrix(wvpMatrix);

    this.scene.render(false);
    this.map.triggerRepaint();
  }
};