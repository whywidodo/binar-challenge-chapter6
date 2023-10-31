const { book } = require("../models");
const { imageKit } = require("../utils");

const createBook = async (req, res) => {
  const { judul, deskripsi } = req.body;
  try {
    const fileToString = req.file.buffer.toString("base64");
    const uploadFile = await imageKit.upload({
      file: fileToString,
      fileName: req.file.originalname,
    });

    const data = await book.create({
      data: {
        judul: judul,
        deskripsi: deskripsi,
        imageUrl: uploadFile.url,
      },
    });

    return res.status(201).json({
      error: false,
      message: "Book successful created",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const allBook = async (req, res) => {
  try {
    const data = await book.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json({
      error: false,
      message: "Loaded all book data successful",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const detailBook = async (req, res) => {
  try {
    const data = await book.findUnique({
      where: {
        id: Number(req.params.bookId),
      },
    });

    if (data != null) {
      return res.status(200).json({
        error: false,
        message: "Load book successful",
        data: data,
      });
    } else {
      return res.status(200).json({
        error: false,
        message: "Book is empty",
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const { judul, deskripsi } = req.body;
  try {
    const data = await book.update({
      where: {
        id: bookId,
      },
      data: {
        judul: judul,
        deskripsi: deskripsi,
      },
    });

    return res.status(201).json({
      error: false,
      message: `Update book sucessful`,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = parseInt(req.params.bookId);

    const data = await book.delete({
      where: {
        id: bookId,
      },
    });

    if (data != null) {
      return res.status(200).json({
        error: false,
        message: `Sucessful delete book with id ${bookId}`,
        data: null,
      });
    } else {
      return res.status(200).json({
        error: false,
        message: `Book with ${bookId} not found`,
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

module.exports = {
  createBook,
  allBook,
  detailBook,
  updateBook,
  deleteBook,
};
