export function validateEventForm(data, mode = 'create') {
  const validModes = ['create', 'edit'];
  if (!validModes.includes(mode)) {
    throw new Error(`Modo inválido para la validación: ${mode}`);
  } 

  const errors = {};

  if (mode === 'create' || data.title !== undefined) {
    if (!data.title || data.title.trim().length < 3) {
      errors.title = 'El título debe tener al menos 3 caracteres.';
    }
  }

  if (mode === 'create' || data.description !== undefined) {
    if (!data.description || data.description.trim().length === 0) {
      errors.description = 'La descripción es obligatoria.';
    }
  }

  if (mode === 'create' || data.date !== undefined) {
    if (!data.date) {
      errors.date = 'La fecha es obligatoria.';
    } else {
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = 'La fecha debe ser igual o posterior a hoy.';
      }
    }
  }

  if (mode === 'create' || data.capacity !== undefined) {
    const capacityStr = String(data.capacity);
    const capacity = Number(capacityStr);
  
    if (!capacityStr || isNaN(capacity)) {
      errors.capacity = 'La capacidad debe ser un número válido.';
    } else if (capacity <= 0) {
      errors.capacity = 'La capacidad debe ser mayor a 0.';
    } else if (!/^\d+$/.test(capacityStr)) {
      errors.capacity = 'La capacidad debe ser un número entero sin puntos ni comas.';
    }
  }

  return errors;
}
