const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const workspaceId = process.env.DEFAULT_WORKSPACE_ID || "default-workspace";
  const workspaceName = process.env.WORKSPACE_NAME || "AI Customer Acquisition";

  await prisma.workspace.upsert({
    where: { id: workspaceId },
    update: { name: workspaceName },
    create: { id: workspaceId, name: workspaceName },
  });

  console.log(`Workspace ready: ${workspaceId}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
