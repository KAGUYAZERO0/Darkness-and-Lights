var createScene = async function () {

    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 1;


    // Default Environment
    var environment = scene.createDefaultEnvironment({ enableGroundShadow: true });
    environment.setMainColor(BABYLON.Color3.FromHexString("#74b9ff"))
    environment.ground.parent.position.y = 0;
    environment.ground.position.y = 0


    var defaultXRExperience = await scene.createDefaultXRExperienceAsync({
      //  xrInput: defaultXRExperience.input,
        floorMeshes: [environment.ground] /* Array of meshes to be used as landing points */
    });
   let groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.backFaceCulling = false;
    groundMaterial.diffuseColor = BABYLON.Color3.Green();
    groundMaterial.diffuseTexture = new BABYLON.Texture('textures/grass.png', scene);

    // simulate a second floor
    const secondGround = environment.ground.clone();
    secondGround.position.z = 10;
    secondGround.position.y = -3;
    secondGround.material = groundMaterial;

    // add the 3nd ground to the floor meshes array
    defaultXRExperience.teleportation.addFloorMesh(secondGround);

   // defaultXRExperience.teleportation.attach();
    defaultXRExperience.pointerSelection.attach();
   // const teleportation = defaultXRExperience.teleportation;


    return scene;
};
