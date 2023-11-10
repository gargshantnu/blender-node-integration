import bpy
import sys
    
# Get command line arguments
print(sys.argv)
fileName, *args = sys.argv[5:]

# Load the model
bpy.ops.import_scene.fbx(filepath=f"uploads/{fileName}")

# Access the imported object
obj = bpy.context.active_object

# Set default values for scale and position
defaultScale = (1.0, 1.0, 1.0)
defaultPosition = (0.0, 0.0, 0.0)

# Initialize scale and position with default values
scaleX, scaleY, scaleZ = defaultScale
positionX, positionY, positionZ = defaultPosition


# Use provided values if available
for arg in args:
    key, value_str = arg.split('=')
    value = float(value_str)
    
    # Set scale or position based on the provided key
    if key.lower() == 'scalex':
        scaleX = value
    elif key.lower() == 'scaley':
        scaleY = value
    elif key.lower() == 'scalez':
        scaleZ = value
    elif key.lower() == 'positionx':
        positionX = value
    elif key.lower() == 'positiony':
        positionY = value
    elif key.lower() == 'positionz':
        positionZ = value


# Edit properties
obj.scale = (float(scaleX), float(scaleY), float(scaleZ))
obj.location = (float(positionX), float(positionY), float(positionZ))

# Save the changes
bpy.ops.wm.save_as_mainfile(filepath=f"uploads/{fileName}")
