import {
  Button,
  Card,
  CardBody,
  Code,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import AlbumList from "./components/AlbumList";
import { AlbumFileItem } from "./type";

function App() {
  const directoryHandle = useRef<FileSystemDirectoryHandle | null>(null);
  const [albumItems, setAlbumItems] = useState<AlbumFileItem[]>([]);
  const [directoryName, setDirectoryName] = useState<string | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  async function handleOpenDirectory() {
    directoryHandle.current = await window.showDirectoryPicker({
      mode: "readwrite",
    });

    const items: AlbumFileItem[] = [];

    for await (const handle of directoryHandle.current.values()) {
      if (handle.kind === "directory" || handle.name === "index.json") {
        continue;
      }

      const file = await handle.getFile();
      items.push({
        filename: handle.name,
        data: JSON.parse(await file.text()),
      });
    }

    setAlbumItems(items);
    setDirectoryName(directoryHandle.current.name);
  }

  function handleClickAlbumList(filename: string) {
    setActiveAlbum(filename);
  }

  return (
    <>
      <Container
        maxW={1800}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minH="100dvh"
        gap={8}
      >
        <Card>
          <CardBody display="flex" alignItems="center" gap="1rem">
            <Button
              onClick={handleOpenDirectory}
              colorScheme={directoryName ? "gray" : "blue"}
              variant="solid"
            >
              {directoryName ? "Change Directory" : "Open Directory"}
            </Button>
            {directoryName ? (
              <Text>
                Now working with directory <Code>{directoryName}</Code>.
              </Text>
            ) : (
              <Text>You haven't open a directory.</Text>
            )}
          </CardBody>
        </Card>

        {directoryName && (
          <Flex gap={4} h="70vh" minH="350px">
            <Card maxW={400}>
              <CardBody
                display="flex"
                flexDirection="column"
                gap={4}
                maxW={400}
                h="100%"
              >
                <Button flexShrink={0} colorScheme="blue" variant="outline">
                  New Album
                </Button>
                <AlbumList
                  albumItems={albumItems}
                  active={activeAlbum}
                  onClick={handleClickAlbumList}
                ></AlbumList>
              </CardBody>
            </Card>
            <Card flex={1}>
              <CardBody>{activeAlbum ?? "No active album."}</CardBody>
            </Card>
          </Flex>
        )}
      </Container>
    </>
  );
}

export default App;
