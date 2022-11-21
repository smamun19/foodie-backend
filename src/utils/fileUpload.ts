import { MultipartFile } from "@fastify/multipart";

export const onFile = async (part: MultipartFile) => {
  const { filename, mimetype, encoding } = part;
  const buff = await part.toBuffer();

  const decoded = Buffer.from(buff.toString("base64"), "base64").toString(
    "base64"
  );
  // @ts-ignore
  part.value = { filename, mimetype, encoding, decoded };
};
