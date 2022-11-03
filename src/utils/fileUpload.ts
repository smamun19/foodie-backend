import fs from "fs";
import path from "path";
import { promisify } from "util";
import { pipeline, Readable } from "stream";
const pump = promisify(pipeline);

export const onFile = async (part) => {
  const { filename, mimetype, encoding } = part;
  const buff = await part.toBuffer();

  const decoded = Buffer.from(buff, "base64").toString("base64");
  part.value = { filename, mimetype, encoding, decoded };
};
