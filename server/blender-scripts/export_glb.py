import bpy
import sys

# blender --background --python .\export_glb.py -- "samba_dancing"

bpy.ops.object.select_all(action='DESELECT')
bpy.ops.object.select_by_type(type='MESH')
bpy.ops.object.delete()

# Get command line arguments
print(sys.argv)

fileName = sys.argv[5]

# print(fileName)

# Load the model
bpy.ops.import_scene.fbx(filepath=f"../uploads/{fileName}.fbx")


# Export as GLB
bpy.ops.export_scene.gltf(filepath=f"../uploads/{fileName}.glb", export_format='GLB')


# Quit Blender
bpy.ops.wm.quit_blender()
