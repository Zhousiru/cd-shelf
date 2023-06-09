import { Badge, Button, Flex, Text } from "@chakra-ui/react";
import { AlbumFileItem } from "../type";

export default function AlbumList({
  albumItems,
  active,
  onClick,
}: {
  albumItems: AlbumFileItem[];
  active: string | null;
  onClick: (filename: string) => void;
}) {
  return (
    <Flex direction="column" gap={1} flex={1} overflowY="scroll">
      {albumItems.map((item) => {
        return (
          <Button
            variant={active === item.filename ? "solid" : "ghost"}
            display="flex"
            gap={2}
            alignItems="center"
            justifyContent="flex-start"
            fontWeight="normal"
            flexShrink={0}
            mr={2}
            onClick={() => onClick(item.filename)}
            key={item.filename}
          >
            <Text overflow="hidden" textOverflow="ellipsis">
              {item.data.name}
            </Text>
            <Badge
              colorScheme="blue"
              textTransform="none"
              ml="auto"
              flexShrink={0}
            >
              {item.filename}
            </Badge>
          </Button>
        );
      })}
    </Flex>
  );
}
