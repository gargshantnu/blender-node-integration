import bpy
import sys

# blender --background --python .\export_fbx.py -- "Megalodon"

bpy.ops.object.select_all(action='DESELECT')
bpy.ops.object.select_by_type(type='MESH')
bpy.ops.object.delete()



# Get command line arguments
print(sys.argv)

fileName = sys.argv[5]

# print(fileName)
# Load the model

# todo this relative path might not work in ec2
# bpy.ops.import_scene.gltf(filepath=f"../uploads/{fileName}.glb")
bpy.ops.import_scene.gltf(filepath=f"uploads/{fileName}.glb")

# bpy.ops.object.select_all(action='SELECT')

# Export as GLB
# bpy.ops.export_scene.fbx(filepath=f"../uploads/{fileName}.fbx")
bpy.ops.export_scene.fbx(filepath=f"uploads/{fileName}.fbx")


# Quit Blender
bpy.ops.wm.quit_blender()
