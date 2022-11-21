import { FastifyRequest, FastifyReply } from "fastify";
import fs, { mkdir, writeFile } from "fs";
import { promisify } from "util";
import { pipeline, Readable } from "stream";
const pump = promisify(pipeline);
import prisma from "../../db/prisma";
import { KnownError, resHandler } from "../../utils/response";

import {
  CreateVoucherInput,
  UpdateVoucherInput,
  AddHelpCenterInput,
  AddHelpCenterQueryInput,
  EditHelpCenterInput,
  EditHelpCenterQueryInput,
  AddRestaurantInput,
  EditRestaurantInput,
  UploadPhotoType,
  AddItemInput,
} from "../../schema/schemas";
import { Multipart, MultipartFile, MultipartValue } from "@fastify/multipart";
import path from "path";

export const addVoucher = async (
  req: FastifyRequest<{ Body: CreateVoucherInput }>,
  res: FastifyReply
) => {
  const { details, isActive, name, value } = req.body;
  await prisma.voucher.create({
    data: { details, isActive, name: name?.toUpperCase(), value },
  });
  resHandler(res, 201, "Success");
};

export const editVoucher = async (
  req: FastifyRequest<{ Body: UpdateVoucherInput }>,
  res: FastifyReply
) => {
  const { id, details, isActive, name, value } = req.body;
  const r = await prisma.voucher.update({
    where: { id },
    data: { details, isActive, name: name?.toUpperCase(), value },
  });
  resHandler(res, 200, "Success", r);
};

export const addHelpCenter = async (
  req: FastifyRequest<{ Body: AddHelpCenterInput }>,
  res: FastifyReply
) => {
  const { title, icon } = req.body;
  const result = await prisma.helpCenter.create({
    data: { title, icon },
  });
  resHandler(res, 201, "Success", result);
};

export const editHelpCenter = async (
  req: FastifyRequest<{ Body: EditHelpCenterInput }>,
  res: FastifyReply
) => {
  const { title, icon, isActive, id } = req.body;
  const result = await prisma.helpCenter.update({
    where: { id },
    data: { title, icon, isActive },
  });
  resHandler(res, 200, "Success", result);
};

export const addHelpCenterQuery = async (
  req: FastifyRequest<{ Body: AddHelpCenterQueryInput }>,
  res: FastifyReply
) => {
  const result = await prisma.helpCenterQuery.create({
    data: req.body,
  });
  resHandler(res, 201, "Success", result);
};

export const editHelpCenterQuery = async (
  req: FastifyRequest<{ Body: EditHelpCenterQueryInput }>,
  res: FastifyReply
) => {
  const { title, icon, isActive, id } = req.body;
  const result = await prisma.helpCenterQuery.update({
    where: { id },
    data: { title, icon, isActive },
  });
  resHandler(res, 200, "Success", result);
};

export const addRestaurant = async (
  req: FastifyRequest<{ Body: AddRestaurantInput }>,
  res: FastifyReply
) => {
  const result = await prisma.restaurant.create({
    data: req.body,
  });

  resHandler(res, 201, "Success", result);
};

export const editRestaurant = async (
  req: FastifyRequest<{ Body: EditRestaurantInput }>,
  res: FastifyReply
) => {
  const result = await prisma.restaurant.update({
    where: { id: req.body.id },
    data: req.body,
  });
  resHandler(res, 200, "Success", result);
};

export const uploadRestaurantPhoto = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  // WITHOUT SWAGGER

  // const data: MultipartFile | undefined = await req.file();

  // if (data) {
  //   console.log("--decodedJsonObject-->", data.fields["id"]?.value);
  //   await pump(
  //     data.file,
  //     fs.createWriteStream(path.join("src", "static", `${data.filename}`))
  //   );
  // }

  //console.log(req.body.filename);

  // WITH SWAGGER

  const { photo } = await prisma.restaurant.update({
    // @ts-ignore
    where: { id: req.body.id },
    data: {
      photo: {
        create: {
          // @ts-ignore
          name: req.body.filename,
          // @ts-ignore

          type: req.body.mimetype,
          // @ts-ignore
          path: ["restaurant", req.body.id],
        },
      },
    },
    select: { photo: true },
  });

  if (!photo) {
    return resHandler(res, 500, "Failed");
  }
  // @ts-ignore
  const decodedFile = Buffer.from(req.body.file, "base64");

  const stream = Readable.from(decodedFile);

  const cwd = process.cwd();
  const directory = `${cwd}${photo.host}${photo.path.join("/")}`;
  const path = `${directory}/${photo.name}`;

  await mkdir(directory, { recursive: true }, (err) => {
    if (err) {
      throw new KnownError(500, "Somethings wrong");
    }
  });

  await pump(stream, fs.createWriteStream(path));

  return resHandler(res, 200, "Success", { path: path.replace(cwd, "") });
};

export const addItem = async (
  req: FastifyRequest<{ Body: AddItemInput }>,
  res: FastifyReply
) => {
  const { category, id, name, price, details, variation } = req.body;
  if (variation) {
    const result = await prisma.restaurant.update({
      where: { id },
      data: {
        item: {
          create: {
            name,
            category,
            price,
            details,
            variation: {
              createMany: { data: variation },
            },
          },
        },
      },
    });
    return resHandler(res, 201, "Success", result);
  }

  const result = await prisma.restaurant.update({
    where: { id },
    data: {
      item: { create: { name, category, details, price } },
    },
  });

  return resHandler(res, 201, "Success", result);
};
