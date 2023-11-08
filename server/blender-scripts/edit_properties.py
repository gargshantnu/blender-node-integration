import bpy
import sys

# Get command line arguments
_, fileName, scale, position = sys.argv

# Load the model
bpy.ops.import_scene.fbx(filepath=f"uploads/{fileName}")

# Access the imported object
obj = bpy.context.active_object

# Edit properties
obj.scale = (float(scale), float(scale), float(scale))
obj.location = (float(position), float(position), float(position))

# Save the changes
bpy.ops.wm.save_as_mainfile(filepath=f"uploads/{fileName}")
