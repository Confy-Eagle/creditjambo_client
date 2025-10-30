function toPublicDevice(device) {
  return {
    id: device.id,
    device_id: device.device_id,
    device_info: device.device_info,
    verified: !!device.verified, // ✅ ensures boolean
    verified_at: device.verified_at,
    verified_by: device.verified_by,
    user_id: device.user_id,
  };
}

module.exports = { toPublicDevice };
