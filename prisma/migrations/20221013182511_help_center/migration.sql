-- CreateTable
CREATE TABLE "HelpCenter" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HelpCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpCenterQuery" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "helpCenterId" INTEGER NOT NULL,

    CONSTRAINT "HelpCenterQuery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HelpCenter" ADD CONSTRAINT "HelpCenter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpCenterQuery" ADD CONSTRAINT "HelpCenterQuery_helpCenterId_fkey" FOREIGN KEY ("helpCenterId") REFERENCES "HelpCenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
