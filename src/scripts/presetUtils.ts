export function validatePreset(possiblePreset: unknown): ValidationResult {
  if (typeof possiblePreset !== 'object' || !possiblePreset) {
    return { success: false, message: 'Invalid JSON' };
  }

  if (!('title' in possiblePreset)) {
    return { success: false, message: 'Missing or invalid title' };
  }

  if (!('items' in possiblePreset) || !Array.isArray(possiblePreset.items)) {
    return { success: false, message: 'Missing item array' };
  }

  if (!possiblePreset.items.length) {
    return { success: false, message: 'Empty item array' };
  }

  if (
    possiblePreset.items.some(
      (item: unknown) =>
        !(
          typeof item === 'object' &&
          item &&
          'name' in item &&
          typeof item.name === 'string' &&
          'itemID' in item &&
          typeof item.itemID === 'number' &&
          'tokensNQ' in item &&
          typeof item.tokensNQ === 'number' &&
          'tokensHQ' in item &&
          typeof item.tokensHQ === 'number'
        )
    )
  ) {
    return { success: false, message: 'Invalid item array' };
  }

  return { success: true, message: '' };
}

export function validatePresets(possiblePresets: unknown): ValidationResult {
  if (Array.isArray(possiblePresets)) {
    for (const p of possiblePresets) {
      const result = validatePresets(p);
      if (!result.success) return { ...result, multiple: true };
    }

    return { success: true, message: '', multiple: true };
  }

  return validatePreset(possiblePresets);
}

export function constructPreset(possiblePreset: any): Preset | undefined {
  if (!validatePreset(possiblePreset).success) return;

  return {
    title: String(possiblePreset.title),
    items: (<Item[]>possiblePreset.items).map(
      ({ itemID, name, tokensNQ, tokensHQ }) => ({
        itemID,
        name,
        tokensNQ,
        tokensHQ,
      })
    ),
  };
}

export function constructPresets(possiblePresets: unknown): PresetInput {
  if (Array.isArray(possiblePresets)) {
    return possiblePresets.flatMap((p) => constructPresets(p) || []);
  }

  return constructPreset(possiblePresets) || [];
}
