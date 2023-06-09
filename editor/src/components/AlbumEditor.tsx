import {
  Box,
  Button,
  Checkbox,
  Code,
  Flex,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Album, Track } from "../type";

function TrackForm({
  data,
  setData,
}: {
  data: Track;
  setData: (data: Track) => void;
}) {
  return (
    <>
      <Box bg="teal.50">
        <FormLabel>Track title</FormLabel>
        <Input
          type="text"
          value={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        />
        <FormLabel mt={2}>Duration</FormLabel>
        <Input
          type="number"
          value={data.duration}
          onChange={(e) => {
            setData({ ...data, duration: Number(e.target.value) });
          }}
        />
        <FormLabel mt={2}>Starred</FormLabel>
        <Checkbox
          checked={data.star}
          onChange={(e) => {
            setData({ ...data, star: e.target.checked });
          }}
        />
        <FormLabel mt={2}>Comment</FormLabel>
        <Textarea
          value={data.comment}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        />
        <FormLabel mt={2}>
          Track meta (use <Code>#</Code> to split keys and values,{" "}
          <Code>\n</Code> to split items)
        </FormLabel>
        TODO
      </Box>
    </>
  );
}

export default function AlbumEditor({
  data,
  onSave,
}: {
  data: Album;
  onSave: (newData: Album) => void;
}) {
  const [currentData, setCurrentData] = useState<Album>(data);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  return (
    <>
      <Box flex={1} overflowY="scroll">
        <Box mx={2}>
          <FormLabel>Album ID</FormLabel>
          <Input
            type="text"
            value={currentData?.id}
            onChange={(e) => {
              setCurrentData({ ...currentData, id: e.target.value });
            }}
          />

          <FormLabel mt={2}>Album name</FormLabel>
          <Input
            type="text"
            value={currentData?.name}
            onChange={(e) => {
              setCurrentData({ ...currentData, name: e.target.value });
            }}
          />

          <FormLabel mt={2}>Publisher</FormLabel>
          <Input
            type="text"
            value={currentData?.publisher}
            onChange={(e) => {
              setCurrentData({ ...currentData, publisher: e.target.value });
            }}
          />

          <FormLabel mt={2}>Year</FormLabel>
          <Input
            type="text"
            value={currentData?.year}
            onChange={(e) => {
              setCurrentData({ ...currentData, year: Number(e.target.value) });
            }}
          />

          <FormLabel mt={2}>
            Album meta (use <Code>#</Code> as the delimiter)
          </FormLabel>
          <Input
            type="text"
            value={currentData?.meta?.join("#")}
            onChange={(e) => {
              setCurrentData({
                ...currentData,
                meta: e.target.value.split("#"),
              });
            }}
          />

          <FormLabel mt={2}>Cover image URL</FormLabel>
          <Input
            type="text"
            value={currentData?.cover}
            onChange={(e) => {
              setCurrentData({ ...currentData, cover: e.target.value });
            }}
          />

          <FormLabel mt={2}>Feature color</FormLabel>
          <Input
            type="text"
            value={currentData?.color}
            onChange={(e) => {
              setCurrentData({ ...currentData, color: e.target.value });
            }}
          />

          <FormLabel mt={2}>Intro HTML</FormLabel>
          <Textarea
            value={currentData?.intro}
            onChange={(e) => {
              setCurrentData({ ...currentData, intro: e.target.value });
            }}
          />

          <Flex gap={2} direction="column">
            {currentData.track.map((trackItem, index) => (
              <TrackForm
                data={trackItem}
                setData={(data) => {
                  console.log(index);
                  setCurrentData({
                    ...currentData,
                    track: [
                      ...currentData.track.slice(0, index),
                      data,
                      ...currentData.track.slice(index + 1),
                    ],
                  });
                }}
                key={index}
              />
            ))}
          </Flex>

          <Button
            mt={4}
            type="submit"
            colorScheme="blue"
            onClick={() => onSave(currentData)}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}
