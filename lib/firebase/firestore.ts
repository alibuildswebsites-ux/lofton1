import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../../firebase.config';

// Properties
export const getProperties = async (status?: string) => {
  try {
    const propertiesRef = collection(db, 'properties');
    let q = query(propertiesRef, orderBy('createdAt', 'desc'));
    
    if (status) {
      q = query(propertiesRef, where('status', '==', status), orderBy('createdAt', 'desc'));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
};

// User saved properties
export const saveProperty = async (userId: string, propertyId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      savedProperties: arrayUnion(propertyId)
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const unsaveProperty = async (userId: string, propertyId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      savedProperties: arrayRemove(propertyId)
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getSavedProperties = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return [];
    
    const savedIds = userDoc.data().savedProperties || [];
    if (savedIds.length === 0) return [];
    
    const properties = await Promise.all(
      savedIds.map((id: string) => getPropertyById(id))
    );
    
    return properties.filter(p => p !== null);
  } catch (error) {
    console.error('Error fetching saved properties:', error);
    return [];
  }
};

// Blogs
export const getBlogs = async (published = true) => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = published 
      ? query(blogsRef, where('published', '==', true), orderBy('createdAt', 'desc'))
      : query(blogsRef, orderBy('createdAt', 'desc'));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
};

// Agents
export const getAgents = async () => {
  try {
    const agentsRef = collection(db, 'agents');
    const q = query(agentsRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
};

// Testimonials
export const getTestimonials = async () => {
  try {
    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};