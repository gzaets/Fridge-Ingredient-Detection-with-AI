import torch_directml

# Create a DirectML device
dml = torch_directml.device()

# Create a tensor on the DirectML device
x = torch.tensor([1.0, 2.0, 3.0, 4.0], device=dml)
print(f'Tensor on DML device: {x}')
