function parseUUID(uuid: string): string {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) {
      return `"${uuid}" is not a valid UUID.`;
    }
    return uuid;
}

export default parseUUID;