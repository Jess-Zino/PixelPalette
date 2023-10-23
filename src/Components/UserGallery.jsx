import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Grid from './Grid';
import SortableItem from './SortableItem';
import Item from './Item';
import Loader from './Loader';

const UserGallery = (props) => {
  const [images, setImages] = useState([]);
  const [imageTopics, setImageTopics] = useState({});
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [collectionId, setCollectionId] = useState('kgtDeJOqpT0'); // Store the current collection ID
  const query = props.query
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : 'none',
    transition,
  };
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const fetchImages = async () => {
    try {
      // Fetch images from the specified collection or by keyword search
      if (query) {
        await fetchImagesByKeyword(query);
      } 
       else {
          await fetchImagesFromCollection(collectionId);
        }
      
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false after fetching images
    }
  };

  const fetchImagesFromCollection = async (collectionId) => {
    try {
      const apiKey = '7NnKpPQ5MB-Qs8tSt0yIszUPVl4lwDLJS22xELSB1LM';
      const response = await axios.get(`https://api.unsplash.com/collections/${collectionId}/photos`, {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      });

      setImages(response.data);
      const imageUrls = response.data.map((image) => image.urls.small);
      setItems(imageUrls);
    } catch (error) {
      console.error('Error fetching collection images:', error);
    }
  };
  const fetchImageTopics = async () => {
    try {
      const apiKey = '7NnKpPQ5MB-Qs8tSt0yIszUPVl4lwDLJS22xELSB1LM';
      const imageIds = images.map((image) => image.id);
      const topics = {};

      await Promise.all(
        imageIds.map(async (imageId) => {
          const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
            headers: {
              Authorization: `Client-ID ${apiKey}`,
            },
          });

          // Extract the titles from the tags_preview array
          const tagTitles = response.data.tags_preview.map((tag) => tag.title);

          topics[imageId] = tagTitles;
        })
      );

      setImageTopics(topics);

      // Simulate loading for 3 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching image topics:', error);
    }
  };
  useEffect(() => {
    if (images.length > 0) {
      fetchImageTopics();
    }
  }, [images]);
  const fetchImagesByKeyword = async (keyword) => {
    try {
      setIsLoading(true); // Set isLoading to true when a new search is initiated
      const apiKey = '7NnKpPQ5MB-Qs8tSt0yIszUPVl4lwDLJS22xELSB1LM';

      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
        params: {
          query: keyword,
          per_page:20,
        },
      });

      const imageUrls = response.data.results.map((image) => image.urls.small);
      setItems(imageUrls);

      // Update the collection ID to an empty string when performing a search
      setCollectionId('');
    } catch (error) {
      console.error('Error fetching images by keyword:', error);
    } finally {
      setTimeout(
      ()=>  setIsLoading(false), 3000
      )
    // Set isLoading to false after the search is complete
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query, collectionId]);


  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
  return (
    <>

      <div style={{ display: 'flex', width: '100vw', alignItems: 'baseline' }}>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <Grid>
            {items.map((imageUrl, index) => (
              <SortableItem key={index} id={imageUrl} tags={imageTopics[images[index]?.id]} style={{ width: '27vw',height: '30vw', position: 'relative', backgroundColor:"#172434"}}>
                {isLoading && <Loader/>}
                {!isLoading && (
                  <>
                    <div className="tag-list">
                    {query && (
                          <span key={index} className="tag">
                            {query}
                          </span>
                        )}
                      {!query && imageTopics[images[index]?.id]?.map((tag, tagIndex) => (
                          tagIndex === 0 && (
                            <span key={tagIndex} className="tag">
                              {tag}
                            </span>
                          )
                        ))}
                    </div>
                  </>
                )}
              </SortableItem>
            ))}
            </Grid>
                      </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
            {activeId ? <Item id={activeId} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
       <div>

              </div>
              </>
  );
};

export default UserGallery;
