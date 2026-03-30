export function success(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function successWithMeta(res, data, meta, status = 200) {
  return res.status(status).json({ success: true, data, ...meta });
}

export function message(res, msg, status = 200) {
  return res.status(status).json({ success: true, message: msg });
}

export function fail(res, msg, status = 400) {
  return res.status(status).json({ success: false, message: msg });
}

export function paginated(res, data, pagination, status = 200) {
  return res.status(status).json({
    success: true,
    data,
    pagination,
  });
}
