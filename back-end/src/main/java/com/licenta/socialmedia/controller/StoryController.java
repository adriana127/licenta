package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.dto.request.UploadStoryRequest;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Story;
import com.licenta.socialmedia.service.implementation.ChatMessageService;
import com.licenta.socialmedia.service.implementation.StoryService;
import com.licenta.socialmedia.util.PhotoUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class StoryController {
    @Autowired
    private final StoryService storyService;

    @RequestMapping(value = "/story/getAll/{id}/{requestNumber}", method = RequestMethod.GET)
    @ResponseBody
    public List<Story> getAllStories(@PathVariable("id") long id,
                                     @PathVariable("requestNumber") int requestNumber) {
        return storyService.getAll(id,requestNumber);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/story/create",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE, "multipart/form-data"})
    public Story createStory(@ModelAttribute UploadStoryRequest request) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Story story = objectMapper.readValue(request.getStory(), Story.class);
        story.setPhoto(PhotoUtils.compressBytes(request.getPhoto().getBytes()));
        return  storyService.add(story);
    }
}
