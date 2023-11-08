import bpy
import sys

# Get command line arguments
_, fileName = sys.argv

# Load the model
bpy.ops.import_scene.fbx(filepath=f"uploads/{fileName}")

# Access the imported object
obj = bpy.context.active_object

# Export as GLB
bpy.ops.export_scene.gltf(filepath=f"uploads/{fileName}.glb", export_format='GLB')

# Quit Blender
bpy.ops.wm.quit_blender()
