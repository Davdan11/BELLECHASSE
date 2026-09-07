import vtracer
from PIL import Image
import os

# Paths
input_webp = r"C:\Users\danjo\OneDrive\Bureau\Bellechasseenergie\public\logo.webp"
temp_png = r"C:\Users\danjo\OneDrive\Bureau\Bellechasseenergie\public\logo_temp.png"
output_svg = r"C:\Users\danjo\OneDrive\Bureau\Bellechasseenergie\public\logo.svg"

# Convert to PNG for vtracer
print("Converting to PNG...")
img = Image.open(input_webp)
img.save(temp_png)

# Trace
print("Tracing with vtracer...")
vtracer.convert_image_to_svg_py(temp_png, output_svg,
                                colormode='color',
                                hierarchical='stacked',
                                mode='spline',
                                filter_speckle=4,
                                color_precision=6,
                                layer_difference=16,
                                corner_threshold=60,
                                length_threshold=4.0,
                                max_iterations=10,
                                splice_threshold=45,
                                path_precision=8)

# Cleanup
os.remove(temp_png)
print("Saved SVG:", output_svg)
